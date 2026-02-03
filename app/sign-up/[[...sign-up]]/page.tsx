import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="relative z-10">
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-white text-black hover:bg-slate-200',
                            card: 'bg-slate-800/50 backdrop-blur-xl border border-slate-700',
                            headerTitle: 'text-white',
                            headerSubtitle: 'text-slate-400',
                            socialButtonsBlockButton: 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600',
                            formFieldLabel: 'text-slate-300',
                            formFieldInput: 'bg-slate-700 border-slate-600 text-white',
                            footerActionLink: 'text-slate-300 hover:text-white',
                        }
                    }}
                />
            </div>
        </div>
    );
}
