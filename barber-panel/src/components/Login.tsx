import Button from './Button';
import Title from './ResTitle';
import Spacer from './Spacer';

export default () => {
    return (
        <div className='w-[34rem] h-[40rem] bg-dark-foreground rounded-2xl'>
                <Title/>

                <div className='flex justify-center items-center flex-col'>
                    <Button>Rezerwacja z Google</Button>
                    <Spacer>lub</Spacer>
                    <Button>Rezerwacja tradycyjna</Button>
                </div>
        </div>
    )
}