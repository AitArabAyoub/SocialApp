import LogFrom from '../components/LogForm'

function Login() {
  return (
    <main className="grid grid-cols-2 bg-black text-white min-h-screen">
      <section className="flex items-center justify-center col-span-2 md:col-span-1">
        <LogFrom/>
      </section>
      <section className="h-screen hidden md:block">
        <img src="/assets/side-img.svg" alt="" className="h-full w-full object-cover" />
      </section>
    </main>
  )
}

export default Login
