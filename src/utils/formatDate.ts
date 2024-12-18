/**
 * 
 * @returns week(en) date(num) month(en)
 */
export const formatDate = (): string => {
    const today = new Date()


    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = daysOfWeek[today.getDay()]
    const date = today.getDate()
    const month = months[today.getMonth()]

    return `${day} ${date} ${month}`
}