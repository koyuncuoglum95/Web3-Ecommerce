import { useState } from 'react'
import { useAppContext } from '../context/context'
import toast from 'react-hot-toast'


const SellItem = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')

  const { createAndSellProduct } = useAppContext();

  const handleSubmit = async event => {
    event.preventDefault();

    if (name || description || category || price || rating || imageUrl) {
      try {
        toast.promise(
          createAndSellProduct(name, description, category, imageUrl, price, rating),
          {
            loading: 'Creating Product... It may take a few seconds.',
            success: 'Product Created!',
            error: 'Error creating product.'
          },
        )
      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <div className='sell-container'>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Name</span>
        <input
          className='sell-input-textbox'
          type='text'
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Image</span>
        <input
          className='sell-input-textbox'
          type='text'
          onChange={event => setImageUrl(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Description</span>
        <textarea
          className='sell-input-textbox'
          rows='4'
          type='text'
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Category</span>
        <input
          className='sell-input-textbox'
          type='text'
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Price</span>
        <input
          className='sell-input-textbox'
          type='text'
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Rating</span>
        <input
          className='sell-input-textbox'
          type='text'
          value={rating}
          onChange={event => setRating(event.target.value)}
        />
      </div>
       
      <button onClick={handleSubmit} className='sell-input-button'>
        List Item
      </button>
    </div>
  )
}

export default SellItem
