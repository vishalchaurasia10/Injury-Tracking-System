export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Format date in the desired format
    const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    // Format time in 12-hour format with AM/PM
    const hours = date.getHours() % 12 || 12; // Convert 0 to 12
    const minutes = date.getMinutes();
    const amOrPm = date.getHours() < 12 ? "AM" : "PM";
    const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;

    return {
        date: formattedDate,
        time: formattedTime,
    };
}