import './Login.css'
import {firebase, auth} from "../../service/firebase"
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
export default () => {
    const {user, setUser} = useContext(AuthContext)
    const [valid, setValid] = useState(false)
    console.log(user)
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                const {uid, displayName, photoURL} = user

                
                if(!displayName || !photoURL) throw new Error("O usuário não possui foto!")
                
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName
                })
                
                if(user != undefined){
                    setValid(!valid)
                }
                   
                
            }
        })
    }, [])

    
    const onClickLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if(result.user){
            const {uid, displayName, photoURL} = result.user

            if(!displayName || !photoURL) throw new Error("O usuário não possui foto!")

                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName
                })
            
        }
    }
    
    return(
        <div className='login'>
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
                    <div className="container-fluid">
                        <div className="container">
                            <a className="navbar-brand" href="#">
                                <img
                                    src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
                                    alt=""
                                />
                            </a>
                        </div>
                    
                    </div>
            </nav>
            <div className="main-login">
                <div className='login-info'>
                <button type="button" className="btn btn-primary" onClick={onClickLogin}>Login</button>

                </div>
            </div>
        </div>
    )
}