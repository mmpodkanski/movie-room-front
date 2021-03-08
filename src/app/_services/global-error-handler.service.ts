import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from '../_services/error.service';
import { NotificationService } from '../_services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        const notifier = this.injector.get(NotificationService);

        let message;

        console.log(error.message);
        if (error instanceof HttpErrorResponse ) {
            if (error.status == 401) {
                notifier.showError("Prosze się zalogować!");
            } else {
                const err = error.error;
                // Server Error
                message = errorService.getServerMessage(err);
                notifier.showError(message);
            }
        } else {
            // Client Error

            message = errorService.getClientMessage(error);
            notifier.showError(message);
        }

    }
}