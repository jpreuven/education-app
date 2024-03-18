import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../app/features/users/userSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // function handleLogout() {
  //   fetch("http://localhost:5000/logout", {
  //     method: "DELETE",
  //     credentials: "include",
  //   })
  //     .then((r) => {
  //       if (r.ok) {
  //         console.log("User logged out!");
  //         navigate("/");
  //         dispatch(setUser(null));
  //       } else {
  //         console.log("Something went wrong!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error logging out:", error);
  //     });
  // }
  return (
    <div>
      Home
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        recusandae saepe cumque ullam itaque voluptas beatae, aspernatur
        quisquam, expedita enim ea amet assumenda ratione omnis, dolorem quae
        maxime magnam magni accusamus nesciunt placeat necessitatibus
        exercitationem inventore. Soluta labore repudiandae sed aliquam, ipsum
        quibusdam aut harum tempore eius aspernatur error, illum dolore nisi
        reiciendis, consequatur necessitatibus magni fugit ad. Reprehenderit
        explicabo ipsam itaque velit rem laboriosam nemo dolores quis laudantium
        necessitatibus? Aut reprehenderit incidunt cupiditate, deleniti nesciunt
        fugiat. Eius neque at vero perferendis. Ipsa necessitatibus neque
        expedita blanditiis aliquam rem maxime quod aliquid, architecto facilis,
        doloremque unde aperiam aut cupiditate! Non maiores corporis numquam
        vero reprehenderit quaerat aspernatur recusandae. Obcaecati doloribus
        fugiat accusantium nemo pariatur cupiditate dolore numquam voluptas
        earum iste aperiam quam quia impedit labore hic, officiis, assumenda
        provident reprehenderit id esse laborum? Amet sed quos minima saepe sint
        cum modi laudantium doloribus, provident dolor repellat ipsum aperiam.
        Beatae libero veniam sed veritatis quod, asperiores, blanditiis
        assumenda consequuntur illo consequatur soluta id error? Repellendus
        consequuntur, dolores quo, expedita odio possimus laudantium aut
        similique excepturi at, culpa saepe recusandae! Voluptas ex suscipit
        doloremque veritatis aut adipisci totam fuga, reprehenderit esse
        excepturi voluptatem fugiat recusandae ipsum libero corporis quaerat
        itaque at accusamus incidunt! Quo aliquam aperiam autem cumque sit? Quia
        magni sunt quis vitae libero, provident magnam voluptatum quibusdam.
        Animi molestiae minus quisquam ducimus aut tempore officia pariatur
        ullam, amet quaerat doloremque voluptates provident id accusamus
        consectetur nisi. Voluptatem ad illo ducimus praesentium nisi, aliquid
        voluptas et numquam vitae cum soluta nesciunt fugit possimus nemo porro,
        rem velit, repellendus dignissimos odit iure obcaecati dolorum
        molestiae. Nemo ipsum reiciendis dolore placeat esse deleniti error
        molestiae vel tenetur corrupti, voluptatibus aliquid? Architecto tempore
        ab dolore voluptatem quis, provident consequatur. Nemo explicabo
        adipisci quisquam ducimus repellat sequi, illum tempora, eius maiores
        harum assumenda commodi fugiat nam rem. Quo quaerat molestiae sed eum
        quod doloribus enim delectus aliquid at. Fugiat possimus, dolorem quo
        itaque voluptatum dignissimos, at praesentium consequatur illo totam
        veniam magnam alias exercitationem voluptatem pariatur ducimus quos
        soluta, obcaecati officia rem hic nulla laudantium autem! Asperiores
        cupiditate eum, doloremque officiis voluptas quisquam ipsam, ducimus
        repellendus unde aut aliquid eveniet facere magni soluta, corporis quam
        autem. Laborum odio eum a mollitia velit quidem? Aut beatae ducimus
        deserunt quas similique, modi quia omnis optio, aliquid dolorum ratione
        quam earum et voluptate tenetur odio aspernatur placeat quisquam sint
        provident. Mollitia dolorum nostrum beatae unde, autem facilis
        temporibus. Consequuntur voluptatum harum, debitis expedita itaque iusto
        eum. Sunt ullam tempore, non laboriosam repellendus amet quisquam totam
        excepturi accusamus sapiente in doloribus est explicabo nisi vero
        architecto. Eaque fuga beatae, iusto sit modi asperiores optio dolores
        magnam nulla quidem, odio nam unde consectetur dicta minima nostrum,
        officia ipsum? Quibusdam, tenetur labore molestiae quos aliquid nam
        beatae illum ipsum deserunt itaque nemo, assumenda vel repudiandae, odio
        adipisci expedita unde. Totam voluptatum impedit autem? Totam, a
        excepturi assumenda eaque est ut numquam aliquid ratione iure possimus.
        Soluta beatae facere vel aliquid eos officiis aperiam ipsum delectus
        perspiciatis corporis laborum, repudiandae eveniet minima eaque non unde
        vero quasi ut. Omnis ea est ad distinctio minus tenetur, ipsa, assumenda
        dolorem eius rerum, quisquam officia. Libero laboriosam aliquam
        laudantium, ipsum iure quos rerum hic suscipit? Doloribus, earum! Minus
        cupiditate corrupti minima qui dolores quas beatae. Possimus, facilis
        optio unde atque porro doloribus similique repellendus quae eos? Rem
        culpa error asperiores cumque unde quasi quidem nihil molestias
        inventore odit velit pariatur minus laborum, quas, magni ullam nesciunt
        doloribus eum! Mollitia, aliquam. Necessitatibus quas, mollitia nesciunt
        sequi consectetur delectus, numquam architecto doloremque repellendus
        praesentium facere explicabo minus fugiat harum id atque! Deleniti dolor
        fuga facilis suscipit pariatur laboriosam soluta cum possimus maiores
        aliquid hic ipsa, quae amet eum quisquam fugit officiis? Illum cumque
        deleniti commodi consequatur quas, alias iure nihil praesentium nam
        neque velit voluptatum recusandae natus, hic est sint ipsa odio dolorum
        maiores laudantium quibusdam? Debitis ad laboriosam dicta tempora
        incidunt exercitationem laborum, dolorum dolore? Sint doloremque dolorem
        architecto eaque adipisci. A porro pariatur itaque. Nobis voluptatum
        sint cum saepe recusandae eveniet ex obcaecati nesciunt illo ratione
        inventore, animi possimus iusto aliquid dolorem necessitatibus ab
        architecto mollitia reiciendis laborum? Suscipit, odit obcaecati
        consequatur, natus illum veritatis porro temporibus repellat alias autem
        quidem ipsum explicabo cum perspiciatis odio harum accusantium, quis rem
        aliquid ipsam ducimus. Fugiat, amet ut deserunt architecto quasi cum
        minus aperiam ullam error aliquid odio saepe nam reiciendis accusamus.
        Deserunt saepe consequatur reiciendis sit ullam recusandae illo, quaerat
        ipsam doloribus aliquid expedita esse in vitae! Praesentium, error.
        Dolore vero inventore omnis enim sequi eum similique error quia,
        blanditiis unde odit ad, quaerat qui incidunt necessitatibus iste modi,
        mollitia nemo libero. Nesciunt aliquid et possimus? Ipsa animi
        necessitatibus doloribus sit tempora. Tenetur consequatur totam aut.
        Nostrum cumque sapiente, voluptate reiciendis inventore mollitia magnam
        reprehenderit. Corrupti quae voluptatem enim magni ex totam a?
        Accusantium nisi odio voluptate vitae ipsam neque dolore distinctio
        culpa optio repellat, sunt pariatur, quam minima unde ut, ex animi?
        Inventore enim odio doloribus expedita commodi ducimus at corrupti hic
        blanditiis sunt temporibus dolor aperiam voluptatibus sit, atque facere
        vel, nulla placeat? Mollitia dicta sed iste exercitationem, excepturi,
        repellat veniam aliquid tempora ut doloribus eligendi. Consequatur,
        saepe perspiciatis! Sequi mollitia voluptates delectus totam perferendis
        nam fuga exercitationem autem deserunt, at unde sapiente aliquid
        voluptatem minus provident velit nisi iure consequatur distinctio ipsam
        quis qui harum magnam tempore. Odit non voluptate et reiciendis
        necessitatibus amet. Blanditiis, labore. Dolores incidunt animi ad minus
        dolor nihil quia nemo qui alias sequi! Quisquam perspiciatis aliquid
        enim laudantium, porro ea cum tenetur dolorem, pariatur quam veniam
        maxime nam accusamus molestias labore, ad sequi deserunt dicta placeat
        impedit! Quasi voluptatum nemo debitis sit minima at corrupti porro non
        esse facere eum minus laborum sint neque, autem dolore magnam sapiente
        veritatis earum repellat quod quis! Cumque eius recusandae in at. Ad,
        voluptates veniam fugiat dignissimos exercitationem facilis eveniet
        impedit in. Quisquam, impedit. In esse ratione, laborum recusandae
        explicabo non nobis debitis? Ullam odit perspiciatis repudiandae optio
        magnam quis maxime, labore alias enim. Quod culpa nesciunt, provident
        dignissimos assumenda beatae modi!
      </div>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}
