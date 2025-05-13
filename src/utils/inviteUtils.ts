
/**
 * Generates a personalized invite URL for sharing
 * 
 * @param name - Visitor's name
 * @param event - Event name
 * @param date - Event date in YYYY-MM-DD format (optional)
 * @returns Full invite URL
 */
export const generateInviteLink = (
  name: string,
  event: string,
  date?: string
): string => {
  const baseUrl = window.location.origin;
  const params = new URLSearchParams();
  
  params.set('visitor', name);
  params.set('event', event);
  
  if (date) {
    params.set('date', date);
  }
  
  return `${baseUrl}/invite?${params.toString()}`;
};

/**
 * Helper to copy invite link to clipboard
 * 
 * @param url - URL to copy
 * @returns Promise that resolves when copying is complete
 */
export const copyInviteLink = async (url: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(url);
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to copy: ', error);
    return Promise.reject(error);
  }
};
