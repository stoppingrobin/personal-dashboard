import { ApiClient } from '@/lib/api-client';

class ApiClientExternal extends ApiClient {
    constructor(externalUrl: string) {
        super()
    }
}

export default ApiClientExternal;