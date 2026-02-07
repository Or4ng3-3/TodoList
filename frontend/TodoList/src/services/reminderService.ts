export async function getReminders() {
    const response = await fetch('http://192.168.3.221:3001/reminders');
    if (!response.ok){
        throw new Error('failed to fetch reminders')
    };
    return response.json();
}