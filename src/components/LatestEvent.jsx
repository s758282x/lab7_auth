import React from 'react';

function LatestEvent() {
  return (
    <section>
      <h2>Latest Event</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis animi
        laudantium eos atque sed debitis eum deleniti cumque saepe aut
        voluptatibus, dolores commodi corporis quibusdam numquam perferendis,
        molestias tenetur suscipit!
      </p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <img
          src="https://plus.unsplash.com/premium_photo-1709247069711-068d383b8497?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Team enjoying a kickball outing"
          style={{ width: '35%' }}
          loading="lazy"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1661429511577-b165fc04718f?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Team at a happy hour event"
          style={{ width: '35%' }}
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default LatestEvent;