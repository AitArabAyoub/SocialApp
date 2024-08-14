import { useAppSelector } from '../store/hooks'
import SuggUser from './SuggUser'
import { GetSuggUsers } from '../lib/react-query/queries'

function SuggUsers() {
    const {user} = useAppSelector(store => store.auth)
    const {data:users,isLoading,error} = GetSuggUsers(user?.uid as string,user?.following as string[])
    if(isLoading){
        return (
            <div className='w-full flex items-center justify-center'>
                <div className='animate-spin border-4 border-b-transparent border-blue-700 rounded-full w-16 h-16 text-center'></div>
            </div>
        )
    }
    if(error){
        return <h2>Something Went Wrong</h2>
    }
    return (
        <div className="grid grid-cols-2 gap-2">
            {users?.map(el =>{
                return <SuggUser followers={el.followers.length} img={el.profileImg} name={el.name} id={el.uid} key={el.uid}/>
            })}
        </div>
    )
}

export default SuggUsers
