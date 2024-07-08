import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () =>  ({
        alert: <null | Object>null
    }),
    actions: {
        success(message: string) {
            this.alert = { message, type: 'alert-success' };
        },
        error(message: string) {
            this.alert = { message, type: 'alert-danger' };
        },
        clear() {
            this.alert = null;
        }
    }
});