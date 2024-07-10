import { Link, useParams } from "react-router-dom";
import {useState} from "react";
import Perks from '../Perks'

export default function PlacesPage() {
    const { action } = useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [photoLink,setPhotoLink]=useState('');
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState(1);

    function inputHeader(text)
    {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text)
    {
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header,description)
    {
        return(
           <div>
            {inputHeader(header)}
            {inputDescription(description)}
           </div>
        );
    }
    async function addPhotoByLink(ev){
        ev.preventDefault();
   const {data:filename}= await axios.post('/upload-by-link' , {link : photoLink});
   setAddedPhotos(prev => {
    return [...prev, filename];
   });
   setPhotoLink(' ');
    }
    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title','Title for your place.should be short and catchy in advertisement')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title,for example: My lovely apt"/>
                        {preInput('Address','Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                        {preInput('Photos','more = better')}         
                        <div className="flex gap-2">
                           <input value={photoLink}
                                  onChange={(ev) => setPhotoLink(ev.target.value)} 
                                  type="text" placeholder={'Add using link...jpg'}/>
                           <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add photos</button> 
                        </div>
                        <input type="file" className="hidden" />
                        <div className=" mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                         {addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div>
                                {
                                <img className="rounded-2xl" src={'http://localhost:4000/uploads/' + link} alt="" />
                                }
                            </div>
                         ))}

                        <button className=" flex items-center gap-1 jutify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        Upload

                        </button>
                        </div>
                        {preInput('Description','description of the place')}
                        
                         <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                         {preInput('Perks','select all the perks of your place')}
                         
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                           <Perks selected={perks} onChange={setPerks} />
                         </div>
                            
                        {preInput('Extra info','house rules,etc')}
                       
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        {preInput('check in & check out times','add check in and out times,remember to have some time window for cleaning the room between guests ')}
                        
                        <div className="grid  gap-2 sm:grid-cols-3">
                         <div>
                            <h3 className="mt-2 -mb-1">Check in time</h3>
                            
                            <input type = "text" 
                                   value={checkIn} 
                                   onChange={ev => setCheckIn(ev.target.value)}
                                   placeholder="14"/>
                        </div>
                        <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                            
                            <input type = "text" 
                                   value={checkOut} 
                                   onChange={ev => setCheckOut(ev.target.value)} 
                                   placeholder="11"/>
                        </div>
                        <div>
                        <h3 className="mt-2 -mb-1">Max no of guests</h3>
                            <input type = "number" 
                                   value={maxGuests} 
                                   onChange={ev => setMaxGuests(ev.target.value)}/>
                        </div>
                        </div>
                            <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}


