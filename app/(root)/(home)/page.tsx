
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import Filter from '@/components/shared/Filter';
import { HomePageFilters } from '@/constants/filters';
import HomeFilters from '@/components/home/HomeFilters';
import NoResult from '@/components/shared/NoResult';
import QuestionCard from '@/components/cards/QuestionCard';
import { formatNumber } from '@/lib/utils';
import { getQuestions } from '@/lib/actions/question.actions';



async function Home ()  {


  const result = await getQuestions({});
  // console.log(result?.questions!;


 

    return (
        <>
          <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
            <h1 className='h1-bold text-dark100_light900'> All Questions </h1>

            <Link
              href="/ask-question"
              className='flex justify-end max-sm:w-full'
            >
              <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
                Ask a Question
              </Button>
            </Link>
          </div>

          <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>

            <LocalSearchbar 
              route='/'
              iconPosition='left'
              imgSrc='/assets/icons/search.svg'
              placeholder='Search for Questions'
              otherClasses='flex-1'
            />

            <Filter 
              filters={HomePageFilters}
              otherClasses='min-h-[56px] sm:min-w-[170px]'
              containerClasses='hidden max-md:flex'
            />
          </div>

          <HomeFilters />

          <div className='mt-10 flex w-full flex-col gap-6'>
            { result!.questions!.length > 0 
            ? result!.questions!.map((question : any) => (
                <QuestionCard 
                  key={question!._id}
                  _id={question!._id}
                  title={question!.title}
                  author={question!.author}
                  answers={question!.answers}
                  upVotes={formatNumber(question!.upVotes)}
                  views={question!.views}
                  createdAt={question!.createdAt}
                  tags={question!.tags}
                />
            )) 
            : (
                <NoResult
                  title="There's no question to show"
                  description='Be the first to break the silence! Ask a question and kickstart the discussion. Our query could be the next big thing others learn from. Get involved!'
                  linkTitle='Ask a question'
                  link=''
                />
            )
            }
          </div>
        </>
    )
}

export default Home;