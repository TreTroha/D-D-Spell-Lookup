//Example fetch using DnD5eAPI - place subclasses in ul
document.querySelector('.button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://www.dnd5eapi.co/api/spells/${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        //this clears the ul in the dom each time the function runs
        let damageLi = document.getElementById('damage');
        while (damageLi.firstChild) {
            damageLi.removeChild(damageLi.firstChild);
        }
    
        
        let classy = document.getElementById('class');
        while (classy.firstChild) {
            classy.removeChild(classy.firstChild);
        }
        
        let subclass = document.getElementById('subclass');
        while (subclass.firstChild) {
            subclass.removeChild(subclass.firstChild);
        }
        
        //this displays the damage for each spell input at slot level
        let n = 0
        for (n = 1; n <= 9; n++){
            console.log(data.damage.damage_at_slot_level[n])
            if (data.damage.damage_at_slot_level[n] !== undefined){
                // create an li
                const li = document.createElement('li')
                // add text to li
                li.textContent = "Spell Slot #" + n + " " + data.damage.damage_at_slot_level[n]
                // append li to the ul
                document.querySelector('#damage').appendChild(li)
            }
        }

        //this displayes the classes for each spell input
        data.classes.forEach( obj => {
            console.log(obj.name) 
            // create an li
            const li = document.createElement('li')
            // add text to li
            li.textContent = obj.name
            // append li to the ul
            document.querySelector('#class').appendChild(li)
        })

        //this displayes the subclasses for each spell input
        data.subclasses.forEach( obj => {
            console.log(obj.name) 
            // create an li
            const li = document.createElement('li')
            // add text to li
            li.textContent = obj.name
            // append li to the ul
            document.querySelector('#subclass').appendChild(li)
        })
       


      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

