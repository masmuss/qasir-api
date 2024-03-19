export async function orderCodeGenerator(sequence: string): Promise<string> {
  const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
  const year = new Date().getFullYear().toString().slice(-2);
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const date = new Date().getDate().toString().padStart(2, '0');

  return `${randomChars}${year}${month}${date}${sequence}`;
}
