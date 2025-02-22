import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const Login = () => {
  const { signIn, user, loading, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'

  if (user) return <Navigate to={from} replace={true} />
  if (loading) return <LoadingSpinner />

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      await signIn(email, password)
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
    setLoading(false);
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-base-100'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-base-300 text-base-content'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold text-blood'>Log In</h1>
          <p className='text-sm text-base-content'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blood text-base-content'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                required
                autoComplete='current-password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blood text-base-content'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='btn bg-blood w-full text-white'
            >
              Continue
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button type='button' className='text-xs hover:underline hover:text-blood text-base-content'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16'></div>
          <p className='px-3 text-sm text-base-content'>
            or Create an accounts
          </p>
          <div className='flex-1 h-px sm:w-16'></div>
        </div>
        <p className='px-6 text-sm text-center text-base-content'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/register'
            className='hover:underline hover:text-blood text-gray-600'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
