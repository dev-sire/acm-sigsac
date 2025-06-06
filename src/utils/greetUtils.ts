
/**
 * Generate an Eid greeting link with personalized parameters
 * @param name - Name of the person to greet
 * @returns Full URL for the greeting page
 */
export const generateGreetingLink = (name: string): string => {
  const baseUrl = window.location.origin;
  const params = new URLSearchParams({
    name: name.trim()
  });
  
  return `${baseUrl}/greet?${params.toString()}`;
};

/**
 * Copy greeting link to clipboard
 * @param link - The greeting link to copy
 */
export const copyGreetingLink = async (link: string): Promise<void> => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(link);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};