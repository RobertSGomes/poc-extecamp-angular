export function formatDate(date: string | undefined): string {
  if (!date) return 'Não informado';

  const [, day, month] = new Date(date).toUTCString().split(' ');

  return `${day} de ${formatMonth(month)}`;
}

function formatMonth(month: string) {
  switch (month) {
    case 'Jan':
      return 'janeiro';
    case 'Feb':
      return 'fevereiro';
    case 'Mar':
      return 'março';
    case 'Apr':
      return 'abril';
    case 'May':
      return 'maio';
    case 'Jun':
      return 'junho';
    case 'Jul':
      return 'julho';
    case 'Aug':
      return 'agosto';
    case 'Sep':
      return 'setembro';
    case 'Oct':
      return 'outubro';
    case 'Nov':
      return 'novembro';
    case 'Dec':
      return 'dezembro';
    default:
      return '';
  }
}
