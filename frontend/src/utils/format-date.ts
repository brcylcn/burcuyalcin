export function formatDate(dateStr: string) {
  if(!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' });
}