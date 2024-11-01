import {API_URL} from './api_infos'; 
const getHeaders = () => ({
    'Content-Type': 'application/json',
    });

interface Subscription {
    id : string | undefined;
    label : string;
    price : number;
    description: string;
    features : string[];
}
interface SubscriptionToCreate {
    label : string;
    price : number;
    description: string;
    features : string[];
}

//to create subscription

export const createSubscription = async (
    data:{
          adminId: string | undefined;
          suscribtion: SubscriptionToCreate;  

    }) => {
    const response = await fetch(`${API_URL}/subscriptions/create`, {
        method: 'GET',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la creation de l\' abonnement');
    }
    return response.json();
}


// to update subscription

export const updateSubscription = async (
    data:{
          adminId: string | undefined;
          suscribtion: Subscription;  

    }) => {
    const response = await fetch(`${API_URL}/subscriptions/update`, {
        method: 'PUT',
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
    const response = await fetch(`${API_URL}/subscriptions/${susbscriptionId}`, {
        method: 'GET',
        headers: getHeaders()
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la recherche de l\' abonnement');
    }
    return response.json();
}

// to get a current suscription of a user
export const getCurrentUserSubscription = async (userId:string | undefined) => {
    const response = await fetch(`${API_URL}/subscriptions/current/${userId}`, {
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
export const changeSubscription = async (subscriptionId:string | undefined,userId:string | undefined ) => {
    const response = await fetch(`${API_URL}/subscriptions/change/${subscriptionId}/${userId}`, {
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
        throw new Error(errorData.message || 'Erreur lors de lasupression de l\' abonnement');
    }
    return response.json();
}


