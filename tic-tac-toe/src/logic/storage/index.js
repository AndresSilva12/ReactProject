export const removeFromStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
} 

export const saveInStorage = ({board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}