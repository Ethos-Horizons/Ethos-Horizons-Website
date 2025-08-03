// Utility to convert JavaScript object literals to JSON format
export const convertMockDataToJson = (mockDataString: string): string => {
  try {
    // Remove the export and const parts, extract just the object
    let cleaned = mockDataString
      .replace(/export\s+const\s+mockBlogPosts\s*=\s*/, '') // Remove export declaration
      .replace(/;\s*$/, '') // Remove trailing semicolon
      .trim();
    
    // If it's an array, extract the first object
    if (cleaned.startsWith('[')) {
      cleaned = cleaned.slice(1, -1); // Remove outer brackets
      // Find the first complete object
      let braceCount = 0;
      let startIndex = -1;
      let endIndex = -1;
      
      for (let i = 0; i < cleaned.length; i++) {
        if (cleaned[i] === '{') {
          if (braceCount === 0) startIndex = i;
          braceCount++;
        } else if (cleaned[i] === '}') {
          braceCount--;
          if (braceCount === 0) {
            endIndex = i + 1;
            break;
          }
        }
      }
      
      if (startIndex !== -1 && endIndex !== -1) {
        cleaned = cleaned.slice(startIndex, endIndex);
      }
    }
    
    // Convert property names to use double quotes
    cleaned = cleaned.replace(/(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*):/g, '$1"$2":');
    
    // Handle template literals (backticks) by converting to JSON strings
    cleaned = cleaned.replace(/`([^`]*)`/g, (match, content) => {
      // Escape special characters for JSON
      const escaped = content
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/"/g, '\\"')    // Escape double quotes
        .replace(/\n/g, '\\n')   // Escape newlines
        .replace(/\r/g, '\\r')   // Escape carriage returns
        .replace(/\t/g, '\\t');  // Escape tabs
      return `"${escaped}"`;
    });
    
    // Handle any remaining single quotes in string values
    cleaned = cleaned.replace(/(:\s*)'([^']*)'/g, '$1"$2"');
    
    // Remove trailing commas
    cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
    
    return cleaned;
  } catch (error) {
    throw new Error('Failed to convert mock data to JSON');
  }
};

// Function to convert a single blog post object to JSON
export const convertBlogPostToJson = (blogPostString: string): string => {
  try {
    let cleaned = blogPostString.trim();
    
    // Remove surrounding braces if present
    if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
      cleaned = cleaned.slice(1, -1);
    }
    
    // Add back the braces
    cleaned = `{${cleaned}}`;
    
    // Convert property names to use double quotes (but be more careful)
    // Only convert property names that aren't already quoted
    cleaned = cleaned.replace(/(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*):/g, '$1"$2":');
    
    // Handle template literals (backticks) by converting to JSON strings
    cleaned = cleaned.replace(/`([^`]*)`/g, (match, content) => {
      // Escape special characters for JSON
      const escaped = content
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/"/g, '\\"')    // Escape double quotes
        .replace(/\n/g, '\\n')   // Escape newlines
        .replace(/\r/g, '\\r')   // Escape carriage returns
        .replace(/\t/g, '\\t');  // Escape tabs
      return `"${escaped}"`;
    });
    
    // Handle any remaining single quotes in string values
    cleaned = cleaned.replace(/(:\s*)'([^']*)'/g, '$1"$2"');
    
    // Fix malformed URLs that might have been incorrectly processed
    // This fixes cases like ""https"://example.com" -> "https://example.com"
    cleaned = cleaned.replace(/""([^"]*)"([^"]*)"([^"]*)"/g, '"$1$2$3"');
    
    // Additional fix for the specific case we're seeing
    cleaned = cleaned.replace(/""https"([^"]*)"/g, '"https$1"');
    
    // Fix image_url field specifically
    cleaned = cleaned.replace(/"image_url":\s*""([^"]*)""/g, '"image_url": "$1"');
    
    // Remove trailing commas
    cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
    
    return cleaned;
  } catch (error) {
    throw new Error('Failed to convert blog post to JSON');
  }
};

// Function to extract just the HTML content from a blog post object
export const extractContentFromBlogPost = (blogPostString: string): string => {
  try {
    // Find the content field with backticks
    const contentMatch = blogPostString.match(/content:\s*`([^`]*)`/);
    if (contentMatch) {
      return contentMatch[1].trim();
    }
    
    // If no backticks found, try to find content with regular quotes
    const contentMatch2 = blogPostString.match(/content:\s*"([^"]*)"/);
    if (contentMatch2) {
      return contentMatch2[1].trim();
    }
    
    throw new Error('No content field found');
  } catch (error) {
    throw new Error('Failed to extract content from blog post');
  }
};

// Function to extract content AND remove the content field from the JSON
export const extractContentAndRemoveField = (blogPostString: string): { content: string; jsonWithoutContent: string } => {
  try {
    let content = '';
    let jsonWithoutContent = blogPostString;
    
    // Find and extract content with backticks
    const contentMatch = blogPostString.match(/content:\s*`([^`]*)`/);
    if (contentMatch) {
      content = contentMatch[1].trim();
      // Remove the entire content field (including the comma before it if it exists)
      jsonWithoutContent = blogPostString.replace(/,\s*content:\s*`[^`]*`/, ''); // Remove with comma
      jsonWithoutContent = jsonWithoutContent.replace(/content:\s*`[^`]*`\s*,?/, ''); // Remove without comma
    } else {
      // Try with regular quotes
      const contentMatch2 = blogPostString.match(/content:\s*"([^"]*)"/);
      if (contentMatch2) {
        content = contentMatch2[1].trim();
        // Remove the entire content field (including the comma before it if it exists)
        jsonWithoutContent = blogPostString.replace(/,\s*content:\s*"[^"]*"/, ''); // Remove with comma
        jsonWithoutContent = jsonWithoutContent.replace(/content:\s*"[^"]*"\s*,?/, ''); // Remove without comma
      } else {
        throw new Error('No content field found');
      }
    }
    
    // Clean up any double commas that might be left
    jsonWithoutContent = jsonWithoutContent.replace(/,\s*,/g, ',');
    // Clean up comma at the end of the object
    jsonWithoutContent = jsonWithoutContent.replace(/,\s*}/g, '}');
    
    // Convert the remaining JavaScript object literal to proper JSON
    jsonWithoutContent = convertBlogPostToJson(jsonWithoutContent);
    
    return { content, jsonWithoutContent };
  } catch (error) {
    throw new Error('Failed to extract content and remove field from blog post');
  }
};

// Portfolio-specific functions

// Function to convert portfolio project object to JSON
export const convertPortfolioProjectToJson = (portfolioProjectString: string): string => {
  try {
    let cleaned = portfolioProjectString.trim();
    
    // Remove surrounding braces if present
    if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
      cleaned = cleaned.slice(1, -1);
    }
    
    // Add back the braces
    cleaned = `{${cleaned}}`;
    
    // Convert property names to use double quotes (but be more careful)
    // Only convert property names that aren't already quoted
    cleaned = cleaned.replace(/(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*):/g, '$1"$2":');
    
    // Handle template literals (backticks) by converting to JSON strings
    cleaned = cleaned.replace(/`([^`]*)`/g, (match, content) => {
      // Escape special characters for JSON
      const escaped = content
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/"/g, '\\"')    // Escape double quotes
        .replace(/\n/g, '\\n')   // Escape newlines
        .replace(/\r/g, '\\r')   // Escape carriage returns
        .replace(/\t/g, '\\t');  // Escape tabs
      return `"${escaped}"`;
    });
    
    // Handle any remaining single quotes in string values
    cleaned = cleaned.replace(/(:\s*)'([^']*)'/g, '$1"$2"');
    
    // Fix malformed URLs that might have been incorrectly processed
    // This fixes cases like ""https"://example.com" -> "https://example.com"
    cleaned = cleaned.replace(/""([^"]*)"([^"]*)"([^"]*)"/g, '"$1$2$3"');
    
    // Additional fix for the specific case we're seeing
    cleaned = cleaned.replace(/""https"([^"]*)"/g, '"https$1"');
    
    // Fix image_url field specifically
    cleaned = cleaned.replace(/"image_url":\s*""([^"]*)""/g, '"image_url": "$1"');
    
    // NEW: Fix missing closing double quotes for string values
    // These are general heuristics for unclosed strings before a comma or closing brace/bracket
    cleaned = cleaned.replace(/:\s*"([^"]*),/g, ':"$1",'); // Fix unclosed string before a comma
    cleaned = cleaned.replace(/:\s*"([^"]*)\s*([}\]])/g, ':"$1"$2'); // Fix unclosed string before closing brace/bracket

    // Remove trailing commas
    cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
    
    return cleaned;
  } catch (error) {
    throw new Error('Failed to convert portfolio project to JSON');
  }
};

// Function to extract results and journey content from portfolio project
export const extractPortfolioContentAndRemoveFields = (portfolioProjectString: string, fieldToExtract?: 'results' | 'journey'): { 
  results: string; 
  journey: string; 
  jsonWithoutContent: string 
} => {
  try {
    console.log('Starting extraction from:', portfolioProjectString.substring(0, 200) + '...');
    
    let results = '';
    let journey = '';
    let jsonWithoutContent = portfolioProjectString;
    
    // More robust regex patterns that handle escaped quotes and newlines
    const extractAndRemove = (fieldName: 'results' | 'journey', inputString: string) => {
      let extractedContent = '';
      let modifiedString = inputString;

      // Try backticks first - more robust pattern
      const backtickPattern = new RegExp(`${fieldName}:\\s*\`([^\`]*)\``);
      let match = inputString.match(backtickPattern);
      if (match) {
        extractedContent = match[1].trim();
        console.log(`Found ${fieldName} with backticks:`, extractedContent.substring(0, 100) + '...');
        // Remove the field with backticks
        modifiedString = modifiedString.replace(new RegExp(`,\\s*${fieldName}:\\s*\`[^\`]*\``), ''); // Remove with comma
        modifiedString = modifiedString.replace(new RegExp(`${fieldName}:\\s*\`[^\`]*\`\\s*,?`), ''); // Remove without comma
      } else {
        // Try double quotes - more robust pattern
        const quotePattern = new RegExp(`${fieldName}:\\s*"([^"]*)"`);
        match = inputString.match(quotePattern);
        if (match) {
          extractedContent = match[1].trim();
          console.log(`Found ${fieldName} with quotes:`, extractedContent.substring(0, 100) + '...');
          // Remove the field with quotes
          modifiedString = modifiedString.replace(new RegExp(`,\\s*${fieldName}:\\s*"[^"]*"`), ''); // Remove with comma
          modifiedString = modifiedString.replace(new RegExp(`${fieldName}:\\s*"[^"]*"\\s*,?`), ''); // Remove without comma
        } else {
          console.log(`No ${fieldName} field found in input`);
          console.log(`Input contains "${fieldName}":`, inputString.includes(fieldName));
          console.log('Input contains "`":', inputString.includes('`'));
          console.log('Input contains \'"\':', inputString.includes('"'));
        }
      }
      return { extractedContent, modifiedString };
    };

    if (fieldToExtract === 'results') {
      const { extractedContent, modifiedString } = extractAndRemove('results', portfolioProjectString);
      results = extractedContent;
      jsonWithoutContent = modifiedString;
    } else if (fieldToExtract === 'journey') {
      const { extractedContent, modifiedString } = extractAndRemove('journey', portfolioProjectString);
      journey = extractedContent;
      jsonWithoutContent = modifiedString;
    } else {
      // Original behavior: extract both (though now unused by PortfolioManager)
      let tempJsonWithoutContent = portfolioProjectString;

      const resultsExtraction = extractAndRemove('results', tempJsonWithoutContent);
      results = resultsExtraction.extractedContent;
      tempJsonWithoutContent = resultsExtraction.modifiedString;

      const journeyExtraction = extractAndRemove('journey', tempJsonWithoutContent);
      journey = journeyExtraction.extractedContent;
      tempJsonWithoutContent = journeyExtraction.modifiedString;

      jsonWithoutContent = tempJsonWithoutContent;
    }
    
    console.log('Extracted results length:', results.length);
    console.log('Extracted journey length:', journey.length);
    console.log('Results content:', results);
    console.log('Journey content:', journey);
    
    // Clean up any double commas that might be left
    jsonWithoutContent = jsonWithoutContent.replace(/,\s*,/g, ',');
    // Clean up comma at the end of the object
    jsonWithoutContent = jsonWithoutContent.replace(/,\s*}/g, '}');
    
    // Convert the remaining JavaScript object literal to proper JSON
    jsonWithoutContent = convertPortfolioProjectToJson(jsonWithoutContent);
    
    return { results, journey, jsonWithoutContent };
  } catch (error) {
    console.error('Error in extractPortfolioContentAndRemoveFields:', error);
    throw new Error(`Failed to extract content and remove fields from portfolio project: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 