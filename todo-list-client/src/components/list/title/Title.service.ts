export const formatDate = (date: string) => {
    return date ? new Date(date).toLocaleDateString("en-GB") : null;
}