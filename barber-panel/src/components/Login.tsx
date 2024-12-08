import Button from './Button';
import Title from './ResTitle';

export default () => {
    return (
        <div className='w-1/2 h-1/2 bg-dark-foreground rounded-xl'>
                <Title/>

                <div className='flex justify-center items-center flex-col'>
                    <Button>Rezerwuj z Google</Button>

                    <div className="w-60 flex items-center uppercase font-montserrat text-xs font-bold mt-2 mb-2 text-neutral-900 
                    before:content-[''] before:border-t before:block before:flex-1 before:border-neutral-900 before:mr-2
                    after:content-[''] after:border-t after:block after:flex-1 after:border-neutral-900 after:ml-2">lub</div>

                    <Button>Rezerwacja tradycyjna</Button>
                </div>
        </div>
    )
}