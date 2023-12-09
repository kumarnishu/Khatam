export function isvalidDate(d: any) {
    if (Object.prototype.toString.call(d) === "[object Date]") {
        if (isNaN(d)) {
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}