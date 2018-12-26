/**
 * Toastr
 */
import { Position, Toaster } from '@blueprintjs/core';

export const Toastr = Toaster.create({
    className: 'self-manager-toastr',
    position: Position.TOP,
    timeout: 3000,
});
