import { t } from 'i18next';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Input = (
  {
    label = '',
    type = 'text',
    placeholder = '',
    value = '',
    name = '',
    onChange = undefined,
    readOnly = false,
    required = true,
    className = '',
  }: {
    label?: string,
    type?: 'number' | 'text' | 'password' | 'date' | 'email',
    placeholder?: string,
    value?: string | number | null | readonly string[] | undefined,
    name?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    readOnly?: boolean,
    required?: boolean,
    className?: string,
  }) => {
  const [show, setShow] = useState<string>('password');
  return (
    <div className={'w-full mb-3 ' + className}>
      <label htmlFor={name} className='mb-2 block font-semibold'>{label}</label>
      {
        type !== 'password' ?
          <input readOnly={readOnly} className='outline-none bg-gray-100 rounded-lg w-full py-2 px-4 border' required={required} placeholder={placeholder} id={name} type={type} name={name} value={value === null ? '' : value} onChange={onChange} />
          :
          <div className='bg-gray-100 rounded-lg overflow-hidden w-full border flex items-center px-4'>
            <input type={show} className='outline-none w-full py-2 bg-gray-100' placeholder={placeholder} required={required} id={name} name={name} value={value === null ? '' : value} onChange={onChange} />
            <button type='button' className='outline-none' onClick={() => setShow(show === 'text' ? 'password' : 'text')}>
              {
                show === 'text' ?
                  <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z" fill="black" />
                    <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z" fill="black" />
                  </svg> :
                  <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3589 11.2375C15.0613 9.72095 16 7.99998 16 7.99998C16 7.99998 13 2.49998 8 2.49998C6.98462 2.49998 6.05172 2.7268 5.20967 3.08831L5.98054 3.85918C6.60983 3.63315 7.28441 3.49998 8 3.49998C10.1194 3.49998 11.879 4.66816 13.1679 5.95708C13.8037 6.59288 14.2978 7.23191 14.6327 7.71239C14.7055 7.81675 14.7704 7.91319 14.8273 7.99998C14.7704 8.08677 14.7055 8.1832 14.6327 8.28756C14.2978 8.76805 13.8037 9.40707 13.1679 10.0429C13.0031 10.2077 12.8306 10.3705 12.6506 10.5292L13.3589 11.2375Z" fill="black" />
                    <path d="M11.2975 9.17612C11.4286 8.80854 11.5 8.41259 11.5 7.99998C11.5 6.06698 9.933 4.49998 8 4.49998C7.58738 4.49998 7.19144 4.57138 6.82386 4.7025L7.64618 5.52482C7.76176 5.50845 7.87989 5.49998 8 5.49998C9.38071 5.49998 10.5 6.61926 10.5 7.99998C10.5 8.12008 10.4915 8.23821 10.4752 8.3538L11.2975 9.17612Z" fill="black" />
                    <path d="M8.35385 10.4751L9.17617 11.2974C8.80858 11.4286 8.41263 11.5 8 11.5C6.067 11.5 4.5 9.93297 4.5 7.99998C4.5 7.58735 4.5714 7.1914 4.70253 6.82381L5.52485 7.64613C5.50847 7.76172 5.5 7.87986 5.5 7.99998C5.5 9.38069 6.61929 10.5 8 10.5C8.12012 10.5 8.23825 10.4915 8.35385 10.4751Z" fill="black" />
                    <path d="M3.34944 5.47072C3.16945 5.62941 2.99693 5.79226 2.83211 5.95708C2.19631 6.59288 1.70216 7.23191 1.36727 7.71239C1.29454 7.81675 1.22963 7.91319 1.1727 7.99998C1.22963 8.08677 1.29454 8.1832 1.36727 8.28756C1.70216 8.76805 2.19631 9.40707 2.83211 10.0429C4.12103 11.3318 5.88062 12.5 8 12.5C8.7156 12.5 9.39018 12.3668 10.0195 12.1408L10.7904 12.9116C9.9483 13.2732 9.01539 13.5 8 13.5C3 13.5 0 7.99998 0 7.99998C0 7.99998 0.938717 6.279 2.64112 4.7624L3.34944 5.47072Z" fill="black" />
                    <path d="M13.6464 14.3535L1.64645 2.35353L2.35355 1.64642L14.3536 13.6464L13.6464 14.3535Z" fill="black" />
                  </svg>
              }
            </button>
          </div>
      }
    </div>
  )
}

export const Submit = (
  {
    backLink = "",
    readOnly = false,
    text = "Save",
    className = '',
    loading = false,
  }: {
    backLink?: string,
    readOnly?: boolean,
    text?: string,
    className?: string,
    loading?:boolean,
  }) => (
  <div className={className}>
    {
      readOnly ?
        <Link to={backLink} className='w-fit py-1 px-5 border border-red-500 rounded-lg text-red-500 mr-3 flex items-center hover:bg-red-50'>{'back'}</Link>
        : <div className='flex' >
          {
            backLink &&
            <Link to={backLink} className='py-1 px-5 border border-red-500 rounded-lg text-red-500 mr-3 flex items-center hover:bg-red-50'>Back</Link>
          }
          <button disabled={loading} className={'py-2 px-5 rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 text-white '+(loading ? 'opacity-[0.5]' : 'opcity-[1]')}>{text}</button>
        </div>
    }
  </div>
)

export const Search = ({
  value,
  onChange,
}: {
  value?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}) => {
  return (
    <div className='flex items-center bg-gray-100 rounded-lg w-full px-4 border'>
      <input className='outline-none bg-gray-100 w-full py-2 pr-2' required placeholder={'search' + '...'} type='search' name='search' value={value === null ? '' : value} onKeyDown={(e) => e.key === 'Enter' && onChange} onChange={onChange} />
      <button>
        <svg className='fill-gray-600' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" />
        </svg>
      </button>
    </div>
  )
}

export const Textarea = (
  {
    label = '',
    placeholder = '',
    value = '',
    name = '',
    onChange = undefined,
    readOnly = false,
    required = false,
    className = '',
    height = 10,
  }: {
    label?: string,
    placeholder?: string,
    value?: string | number | null | readonly string[] | undefined,
    name?: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined,
    readOnly?: boolean,
    required?: boolean,
    className?: string,
    height?: number,
  }) => {
  return (
    <div className={'w-full mb-3 ' + className}>
      <label htmlFor={name} className='mb-2 block font-semibold'>{label}</label>
      <textarea style={{ height: height + 'px' }} className='outline-none bg-gray-100 rounded-lg w-full py-2 px-4 border' readOnly={readOnly} required={required} placeholder={placeholder} id={name} name={name} value={value === null ? '' : value} onChange={onChange}></textarea>
    </div>
  )
}