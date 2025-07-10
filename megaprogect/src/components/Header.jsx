import React from 'react'
import {useSelector} from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'
import {Logout ,Button} from './index'

function Header(){
    const navigate = useNavigate()
     const user = useSelector((state)=> state.auth.status)
     //console.log(user)
     const navItems=[
        {
            name: 'Home',
            slug: "/",
            active:true,
        },
        {
            name: 'Login',
            slug:"/login",
            active: !user,
        },
        {
            name:'Signup',
            slug:"/signup",
            active: !user,
        },
        {
             name: "All Posts",
             slug: "/all-posts",
               active: user,
             },
         {
           name: "Add Post",
          slug: "/add-post",
          active: user,
         },
  ]

    
    return(
        <header className='py-1 shadow bg-orange-500'>
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className='flex'>
                     <div className='mr-4'>
            <Link to='/'>
              <img className='w-[80px] rounded-full shadow-black shadow-lg'
              src="https://img.freepik.com/premium-photo/letter-r-logo-with-gold-red-details_7023-232400.jpg"
               />
              </Link>
                </div>
                <div className='flex ml-auto'>
                    {navItems.map((item)=>
                        //console.log(item.active,item.name,item.slug)
                        item.active? (
                            <Button
                            key={item.slug} 
                            onClick={()=>navigate(item.slug)}
                                 className="  font-bold text-3xl  shadow-black shadow-xl duration-200 hover:bg-gray-800 scale-75 ">
                                {item.name}
                                </Button>)
                      :null  
                )}
                {user && (
                    <div>
                        <Logout/>
                    </div>
                )}
                </div>
            </div>
        </div>
        </header>
    )

}

export default Header