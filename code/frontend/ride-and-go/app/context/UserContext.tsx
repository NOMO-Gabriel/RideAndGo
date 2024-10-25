import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';

interface User {
    id: string;
    averagerating: number;
    birthdate: string;
    createdat: string;
    email: string;
    isonline: boolean;
    mysubscription: string;
    name: string;
    password: string;
    phonenumber: number;
    pseudo: string;
    surname: string;
    updatedat: string;
    vehicle: string;
    avatar: string[];
    mycomplaints: string[];
    myitineraries: string[];
    myplace: string[];
    mytravels: string[];
    picture: string[];
    piece: string[];
    roles: string[];
  }
  
  interface UserContextType {
    users: User[];
    user: User | null;
    fetchUsers: () => void;
    fetchUser: (id: string) => void;
  }
  
  const UserContext = createContext<UserContextType | undefined>(undefined);

  export const UserProvider: React.FC<{children: ReactNode}>=({children})=>{
    const[users, setUsers]=useState<User[]>([]);
    const [user, setUser]=useState<User | null>(null);

    const fetchUsers = async () =>{
        try{
        const response = await fetch ('http://localhost:8080/api/users/');
        const data = await response.json();
       
        setUsers(data);

        }catch(error){
            console.error('Error fetching users:', error);
        }
        
    };

    const fetchUser = async (id:string) =>{
        try{
        const response =await fetch(`http://localhost:8000/users/${id}`);
        const data = await response.json();
        
        setUser(data);

        }catch(error){
            console.error('Error fetching users:', error);
        }
        
    };

    // useEffect(()=>{
    //     fetchUsers();
    // },[]);

    return(
        <UserContext.Provider value={{users,user,fetchUsers,fetchUser}}>
            {children}
        </UserContext.Provider>
    );
  };

  export const useUserContext =()=>{
    const context = useContext(UserContext);
    if(!context){
        throw new Error ('useUserContext must be used within a UserProvider');
    }
    return context;
  }