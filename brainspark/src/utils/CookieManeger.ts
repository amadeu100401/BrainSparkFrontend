import Cookies from 'js-cookie';

interface MainPageInfo {
    [key: string]: any; 
}

interface UserInfo {
    [key: string]: any; 
}

export function saveMainPageInCookie(data: MainPageInfo | null | undefined): void {
    if (data !== null && data !== undefined) {
        Cookies.set('mainPage', JSON.stringify(data), { expires: 7 });
    }
}

export function saveUserInfoInCookie(data: UserInfo | null | undefined): void {
    if (data !== null && data !== undefined) {
        Cookies.set('userInfo', JSON.stringify(data), { expires: 7 });
    }
}

export function updateUserInfo(value: UserInfo | null | undefined): void {
    try {
        let userInfo: UserInfo | null = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')!) : null;

        if (userInfo && value) {
            userInfo = { ...userInfo, ...value };
        } else if (value) {
            userInfo = value;
        }

        Cookies.set('userInfo', JSON.stringify(userInfo), { expires: 7 });
    } catch (error) {
        console.log('Erro ao atualizar as informações no cookie:', error);
    }
}

export function getUserInfo(): UserInfo | null {
    const data = Cookies.get('userInfo');

    if (data !== null && data !== undefined) {
        return JSON.parse(data);
    }

    return null;
}

export function getMainPageInfo(): MainPageInfo | null {
    const data = Cookies.get('mainPage');

    if (data !== null && data !== undefined) {
        return JSON.parse(data);
    }

    return null;
}

export function clearAllCookies(): void {
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
        if (Object.hasOwnProperty.call(allCookies, cookieName)) {
            Cookies.remove(cookieName);
        }
    }
}

export function getTokenSession() : UserInfo | null {
    const cookieToken = Cookies.get('token');

    if (cookieToken !== null && cookieToken !== undefined) {
        return cookieToken;
    }

    return null;
}