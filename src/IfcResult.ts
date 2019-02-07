/**
 * Result Interface
 */
export interface Result {
    success: Boolean
    data: ResData
    message: String
}

export interface ResData {
    id: number,
    result: {},
    error: Object
}
