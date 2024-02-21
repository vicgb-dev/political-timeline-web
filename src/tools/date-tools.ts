export function getDate (date: Date): string {
  return (new Date(date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
}
