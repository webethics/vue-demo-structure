export default function guest ({ next, store }){
    if (localStorage.getItem('user')) {
        return next({
           name: 'home'
        })
    }
    return next()
}
