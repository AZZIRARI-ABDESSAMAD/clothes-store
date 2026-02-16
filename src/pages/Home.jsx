import {  useState } from "react";
import products from "../data/data_products";
import {motion, scale} from "framer-motion";
function Home() {

  const [filtredhoodie, setFiltredhoodie] = useState(products);
  const [active, setActive] = useState("all");


  const Hundlefiltred = (category)=>{
    setFiltredhoodie(products.filter((p)=>(
      p.category === category
    )))
  }
  
  const HundleAllproducts = ()=>{
    setFiltredhoodie(products)
  }
  return (
    <>
    <div>
          <img
            style={{
              objectFit: "cover",
              width: "60%",
              height: "60vh",
              marginLeft : '20%',
              marginTop: "20px",
              borderRadius: "25px"
            }}
            src="/cover.jpeg"
            alt=""
          />
      <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h1 className="fw-bold display-3">Shop Now 👀</h1>
            <h2 className="fw-bold">New Drop</h2>
          </motion.div>
        </div>
    </div>
      <div className="text-center my-4" >

             <button onClick={()=>{
                HundleAllproducts();
                setActive("all");
                }}  
                className={`btn m-3 ${active === "all" ? "btn-primary" : "btn-dark"}`}>
                  All
              </button>
              
              <button onClick={()=>{
                Hundlefiltred('simple');
                setActive('simple');
                }}
                className={`btn m-3 ${active === "simple"? "btn-primary": "btn-dark"}`}>
                  Hoodies-Simple
              </button>

            <button onClick={()=>{
                Hundlefiltred('team')
                setActive('team')
                }}
                className={`btn m-3 ${active=='team' ? 'btn btn-primary': 'btn btn-dark'}`}>
                  hoodie-team</button>
      </div >
      
      <div className="container mt-3">
        <h1><strong> Our hoodies : </strong></h1> <br/>
        <div className="row mt-2">
              {filtredhoodie.map((p)=>(
                  <motion.div
                      whileHover={{scale : 1.1}}
                    
                    className="col-md-3 mb-4" key={p.id}>

                      <div className="card">

                          <img src={p.image} alt="card-img-top"/>
                          <div className={'card-body'}>
                              <h5>{p.name}</h5>
                              <p>{p.price} Dh</p>
                              <a
                                href={`https://wa.me/212704752318?text=Salam, bghit commander ${p.name}`}
                                target="_blank"
                                className="btn btn-success mt-2"
                              >
                                Commander Hoodie
                              </a>


                          </div>

                      </div>

                  </motion.div>
              ))}
        </div>
      </div>

    </>
  )
}

export default Home;


