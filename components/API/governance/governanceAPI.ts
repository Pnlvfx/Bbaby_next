import { postRequestHeaders } from "../../main/config";

const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const translate = async (text:string, language:string) => {
    try {
        const url = `${server}/governance/translate-tweet?lang=${language}`
        const body = JSON.stringify({text})
        const res = await fetch(url, {
            method: 'post',
            headers: postRequestHeaders,
            body,
            credentials: 'include'
        })
        return res;
    } catch (err) {
        if (err instanceof Error) {
            const error = {msg: err.message, ok: false};
            return error as FetchError;
        } else {
            const error = {msg: `That's strange!`, ok: false};
            return error as FetchError
        }
    }
}