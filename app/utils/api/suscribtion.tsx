import {API_URL} from './api_infos'; 
const getHeaders = () => ({
    'Content-Type': 'application/json',
    });

interface Subscription {
    label : string;
    price : number;
    description: string;
    features : string[];
}
type User = {
    id: string | undefined;
    name: string;
    surname: string;
    pseudo: string;
    isSuspend: boolean;
    roles: string[];
    createdat: string;
    updatedat: string;
    paiementDate: string;
  };

//to create subscription

export const createSubscription = async (
    data:{
          adminId: string | undefined;
          suscribtion: Subscription;  

    }) => {
    const response = await fetch(`${API_URL}/subscriptions/create`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la creation de l\' abonnement');
    }
    return response.json();
}



//to get all suscriptions
export const getSubscriptions = async () => {
    const response = await fetch(`${API_URL}/subscriptions/`, {
        method: 'GET',
        headers: getHeaders()
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la recherche des abonnements');
    }
    return response.json();
}

//to get a subscription by id
export const getSubscription = async (susbscriptionId:string | undefined) => {
    const response = await fetch(`${API_URL}/subscriptions/id/${susbscriptionId}`, {
        method: 'GET',
        headers: getHeaders()
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la recherche de l\' abonnement');
    }
    return response.json();
}

//to get a subscription by label
export const getSubscriptionByLabel = async (label:string) => {
    const response = await fetch(`${API_URL}/subscriptions/label/${label}`, {
        method: 'GET',
        headers: getHeaders()
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la recherche de l\' abonnement');
    }
    return response.json();
}  

// to update subscription by label

export const updateSubscriptionByLabel = async (
    data:{
          adminId: string | undefined;
          suscribtion: Subscription;  

    }) => {
    const response = await fetch(`${API_URL}/subscriptions/update/label`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise a jour de l\' abonnement');
    }
    return response.json();
}

// to update subscription by id

export const updateSubscriptionById = async (
    data:{
          adminId: string | undefined;

          id: string | undefined;
          suscribtion: Subscription;  

    }) => {
    const response = await fetch(`${API_URL}/subscriptions/update/id/${data.id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise a jour de l\' abonnement');
    }
    return response.json();
}

// to get a current suscription of a user
export const getUserSubscription = async (userId:string | undefined) => {
    const response = await fetch(`${API_URL}/subscriptions/user/${userId}`, {
        method: 'GET',
        headers: getHeaders()
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la recherche de l\' abonnement');
    }
    return response.json();
}


// to change subscription of a user
export const changeUserSubscription = async (subscriptionLabel:string | undefined,userId:string | undefined ) => {
    const response = await fetch(`${API_URL}/subscriptions/change/${subscriptionLabel}/user/${userId}`, {
        method: 'PUT',
        headers: getHeaders()
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la modification de l\' abonnement');
    }
    return response.json();
}

//to delete subsciption
export const deleteSubscription = async (subscriptionId:string | undefined, adminId:string | undefined) =>{
    const response = await fetch(`${API_URL}/subscriptions/delete/${subscriptionId}/${adminId}`, {
        method: 'DELETE',
        headers: getHeaders()
    }); 
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la supression de l\' abonnement');
    }
    return response.json();
}


