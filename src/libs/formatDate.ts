const formatDate = (dateString: string) => new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export default formatDate;
