import React from 'react';
import Image from 'next/image';
import { comment } from 'postcss';
import useResource from 'hooks/useResource';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Details({ producTitle, comments, decodedToken, products }) {

    // const { response, createResource, deleteResource } = useResource("comment/")
    const { response: commentResponseData, createResource: createComment, deleteResource: deleteComment } = useResource("comment/");
    const { response: productResponseData, createResource: createProduct, deleteResource: deleteProduct } = useResource("");
    function handleCommentDelete (id){
        deleteComment(id)
        
    }

    

    function handeldeleteProduct (id){
        deleteProduct(id)
    }
    
    const createResource_fav = useResource("Favourite_product").createResource
    function handleAddToFav(productId) {
        const body = {
            owner: decodedToken.user_id,
            Product: productId,
            owner_name: decodedToken.username,
        }
        createResource_fav(body)
    }



    let body = {}
    function addComment(ownerId, productId) {
        body.owner = ownerId
        body.Product = productId

    }

    const createResource_comment = useResource("comment").createResource
    function handleAddComment(event) {

        event.preventDefault()
        body.owner_name = decodedToken.username
        body.email = decodedToken.email
        body.body = event.target.comment.value
        createResource_comment(body)
    }


    



    return (
        <div className='outDetail'>

            <div className='detailBody'>
                {/* {console.log(7777777,comments)} */}
                {/* {console.log(88888, decodedToken)} */}
                {/* {console.log(99999,products)} */}
                {products ? (products.map((product) => <div >{product.Title == producTitle ?

                    <div>

                        <div className='detailCard'>

                            <div className='detailImageC'>
                                <Image className='detailImage' src={product.image} alt={product.Title} width='550' height='450' />
                            </div>

                            <div class="vl"></div>

                            <div className='detailTexts'>

                                <h2 className='detailTitle'>{producTitle}</h2>
                                <p className='detailDescription'><p className='Details'>Details:</p>{product.description}</p>
                                <p className='detailPrice'>CURRENT PRICE: &nbsp;&nbsp;<p className='jo'>{product.price} J</p></p>
                                <p className='detailContact'><p className='ContactInfo'>Contact Info: &nbsp;</p><p className='number'>{product.contact_info}</p></p>
                                {decodedToken ? <button key={product.id} onClick={() => handleAddToFav(product.id)} className='button-24' role="button">Add To Fav</button> : <p></p>}
                                <br></br>
                                {decodedToken ? <button className="button-24" key={product.id} onClick={() => {handeldeleteProduct(product.id); }}>Remove</button>:null}



                            </div>

                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                            {/* {decodedToken ? <div className='detailHeart' key={product.id} onClick={() => handleAddToFav(product.id)}><i class="fa fa-heart"></i></div> : <p></p>} */}


                        </div>

                        <p className='commentSection'>Comments:</p>
                        
                            
                            
                            {comments ? (comments.map((comment) => comment.Product == product.id ? <div className='commentSection_1'> 
                            <div className='commentSection_1_1'><img className='commentImage' src='https://img.freepik.com/premium-vector/fox-logo-design_104950-572.jpg' alt='fox' width='40' height='40'/> 
                            <p className='commentusername'>{comment.owner_name}:</p><p className='commentitself'>{comment.body}</p></div><p className='creationtime'>{comment.time_since_creation[0] ? comment.time_since_creation[8] == 0 ? comment.time_since_creation.slice(17,)+' ago' : 
                            comment.time_since_creation.slice(8,15)+" ago" : comment.time_since_creation.slice(0,5)+"ago"}</p> <div className='deleteButton' onClick={()=>handleCommentDelete(comment.id)}>Delete</div></div>  : <p></p>)) : <p></p>}

                           

                            {decodedToken ? (<form className='addCommentForm' onSubmit={handleAddComment}>

                                <div className="page">
                                    <div className="field field_v1">
                                        <label for="first-name" className="ha-screen-reader">Text</label>
                                        <input name="comment" id="first-name" className="field__input" placeholder=""/>
                                            <span className="field__label-wrap" aria-hidden="true">
                                                <span className="field__label">Text</span>
                                            </span>
                                    </div>
                                    
                                    
                                </div>
                                

                                <button class="button-36" role="button" type='submit' onClick={() => addComment(decodedToken.user_id, product.id)}>Add Comment</button>
                            </form>
                            ) : ''}
                        

                    </div>


                    : <p></p>}</div>)) : <p></p>}

            </div>

        </div>



    )
}











