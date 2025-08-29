<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {

        $route = $request->user()->isAdmin() ? 'dashboard' : 'client-dashboard';

        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route($route, absolute: false) . '?verified=1');
        }

        $request->fulfill();

        return redirect()->intended(route($route, absolute: false) . '?verified=1');
    }
}
