import UserAgent from 'user-agents'

export const getFakeUserAgent = (): string => {
    return new UserAgent().toString()
}

export default {getFakeUserAgent}