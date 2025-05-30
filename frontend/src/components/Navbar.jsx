import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <header className='bg-base border-b  border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>
                        Note-App</h1>
                    <div className='items-center flex gap-4 rounded-full'>
                        <Link to={'/create'} className='btn btn-primary rounded-3xl' >
                            <PlusIcon className='size-5' />
                            <span>New note</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar