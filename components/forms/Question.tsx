"use client";
import React, { useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { QuestionsSchema } from '@/lib/validations';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from '@tinymce/tinymce-react';
import { Badge } from '../ui/badge';
import { createQuestion } from '@/lib/actions/question.actions';


interface Props {
    mongoUserId : string;
};



const Question = ({ mongoUserId } : Props) => {

    const type : any = 'create';

    const editorRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof QuestionsSchema>>({
        resolver: zodResolver(QuestionsSchema),
        defaultValues: {
          title: "",
          explanation: "",
        //   tags: [],
        },
    });
    
    async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
        setIsSubmitting(true);
        console.log('Form values', values);

        try {
            // await createQuestion({
            //     title : values.title,
            //     explanation : values.explanation,
            //     tags : values!.tags,
            //     author : JSON.parse(mongoUserId),
            //     path : pathname
            // })


            router.push('/');

        } catch (error) {
            console.error('Error on submit',error)
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputKeyDown = (e : React.KeyboardEvent<HTMLInputElement>, field : any) => {
        if(e.key === 'Enter' && field.name ==='tags') {
            e.preventDefault();

            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim();

            if(tagValue !== '') {
                // if(tagValue.length > 15) {
                //     return form.setError('tags', {
                //         type : 'required',
                //         message : 'Tag must be less than 15 characters.'
                //     })
                // }

                // if(!field.value.includes(tagValue as never)) {
                //     form.setValue('tags', [...field.value, tagValue]);
                //     tagInput.value = ''
                //     form.clearErrors('tags')
                // }
            } else {
                form.trigger();
            }
        }
    };

    const handleTagRemove = (tag : string, field : any) => {
        const newTags = field.value.filter((t : string) => t !== tag);
        form.setValue('tags', newTags);
    };


    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>Question Title <span className='text-primary-500'>*</span> </FormLabel>

                <FormControl className='mt-3.5'>

                    <Input 
                      {...field} 
                      className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    />

                </FormControl>

                <FormDescription className='body-regular mt-2.5 text-light-500'>
                    Be specific and imagine you&apos;re asking a question to another person.
                </FormDescription>
                <FormMessage className='text-red-500'/>
                </FormItem>
            )}
            />

             <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>Detailed explanation of your problem <span className='text-primary-500'>*</span> </FormLabel>

                <FormControl className='mt-3.5'>

                   {/* wysiwyg*/}
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat| codesample',
                    }}
                    initialValue="Welcome to TinyMCE!"
                  />

                </FormControl>

                <FormDescription className='body-regular mt-2.5 text-light-500'>
                    Introduce the problem and expand on what you put in the title. Minimum of 20 characters.
                </FormDescription>
                <FormMessage className='text-red-500'/>
                </FormItem>
            )}
            />

             <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>Tags<span className='text-primary-500'>*</span> </FormLabel>

                <FormControl className='mt-3.5'>
                    <>
                    <Input 
                    //   {...field} 
                      placeholder='Add tags...'
                      className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />

                    {field.value.length > 0 && (
                        <div className='flex-start mt-2.5 gap-2.5'>
                          {field.value.map((tag : any) => (
                            <Badge 
                              key={tag}
                              className='subtitle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize'
                              onClick={() => handleTagRemove(tag, field)}
                            >

                               {tag}
                               <Image 
                                src='/assets/icons/close.svg'
                                alt='close icon'
                                width={12}
                                height={12}
                                className='cursor-pointer object-contain invert-0 dark:invert'
                               />
                            </Badge>
                          ))}
                        </div>
                    )}
                    </>

                </FormControl>

                <FormDescription className='body-regular mt-2.5 text-light-500'>
                    Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
                </FormDescription>
                <FormMessage className='text-red-500'/>
                </FormItem>
            )}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className='primary-gradient w-fit !text-light-900'
            >
                {isSubmitting ? (
                    <>
                      { type === 'edit' ? 'Editing' : 'Posting...'}
                    </>
                ) : 
                (   <>
                      {type === 'edit' ? 'Edit Question' : 'Ask a Question'}
                    </>
                )}
            </Button>
        </form>
        </Form>
    )
    }

export default Question;