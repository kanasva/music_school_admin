"use client"

import LocaleSwitcher from '@/components/locale-switcher';
import { Locale } from '@/lib/i18n-config'
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';


export default function Example({params: { lang },
}: {
  params: { lang: Locale }
}) {
  const session = useSession().data
  
  return (
    <>
    

      <LocaleSwitcher />
      <div>
	      <h1>Sign in</h1>
	      <button onClick={()=> signIn()}>
		      Sign in
	      </button>
	      <button onClick={()=> signOut()}>
		      Sign out
	      </button>
	      <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  )
}




// "use client"

// import { useSession, signIn, signOut } from "next-auth/react";

// export default function SignIn() {
//   const session = useSession().data

//   return (
    
//     <>
//       <div>
//         <h1>Sign in</h1>
//         <button onClick={() => signIn()}>
//           Sign in
//         </button>
//         <button onClick={() => signOut()}>
//           Sign out
//         </button>
//         <pre>{JSON.stringify(session, null, 2)}</pre>
//       </div>
//     </>
//   )
// }
