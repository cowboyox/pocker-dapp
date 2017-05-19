import React from 'react';

import H2 from '../../components/H2';
import H3 from '../../components/H3';
import SeatComponent from '../../components/Seat2';

const colStyle = {
  marginRight: '3em',
};

const colWidth = {
  height: '50px',
  minWidth: '128px',
};

const SeatExamples = () => (
  <div>
    <H2>Seats</H2>
    <div style={{ display: 'flex' }}>
      <div style={colStyle}>
        <H2>Paused</H2>
        <H3>Open</H3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            pending={false}
            open
          />
        </div>
        <H3>Sitting-in</H3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer={false}
            pending
            stackSize={0}
            signerAddr="Username123"
            statusMsg={{
              type: 'info',
              text: 'Sitting-in',
              recent: true,
            }}
          />
        </div>
        <H3>Standing-up</H3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer={false}
            pending
            stackSize={0}
            signerAddr="Username123"
            statusMsg={{
              type: 'info',
              text: 'Standing-in',
              recent: true,
            }}
          />
        </div>
        <H3>Sit-out</H3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer={false}
            pending
            stackSize={0}
            signerAddr="Username123"
            statusMsg={{
              type: 'info',
              text: 'Sit-out',
              recent: true,
            }}
          />
        </div>
      </div>
      <div style={colStyle}>
        <H2>Timer</H2>
        <H3>Normal</H3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={0}
            signerAddr="Username123"
            timerProgress={0.9}
          />
        </div>
        <H3>Warning</H3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={0}
            signerAddr="Username123"
            timerProgress={0.5}
          />
        </div>
        <H3>Danger</H3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={0}
            signerAddr="Username123"
            timerProgress={0.2}
          />
        </div>
      </div>
      <div style={colStyle}>
        <H2>Recent Action</H2>
        <h3>Call, Check</h3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={10000}
            signerAddr="123456789012"
            statusMsg={{
              type: 'success',
              text: 'Call',
              recent: true,
            }}
          />
        </div>
        <h3>Raise, Bet</h3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={10000}
            signerAddr="123456789012"
            statusMsg={{
              type: 'danger',
              text: 'Raise',
              recent: true,
            }}
          />
        </div>
        <h3>All-in, Winner</h3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={999}
            signerAddr="Edith"
            statusMsg={{
              type: 'warning',
              text: 'All-in',
              recent: true,
            }}
          />
        </div>
      </div>
      <div style={colStyle}>
        <H2>Past Action</H2>
        <h3>Call, Check</h3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={10000}
            signerAddr="123456789012"
            statusMsg={{
              type: 'success',
              text: 'Call',
              recent: false,
            }}
          />
        </div>
        <h3>Raise, Bet</h3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={10000}
            signerAddr="123456789012"
            statusMsg={{
              type: 'danger',
              text: 'Raise',
              recent: false,
            }}
          />
        </div>
        <h3>All-in, Winner</h3>
        <div style={{ position: 'relative' }}>
          <div style={colWidth} />
          <SeatComponent
            activePlayer
            cards={['d2', 's2']}
            pending={false}
            stackSize={999}
            signerAddr="Edith"
            statusMsg={{
              type: 'warning',
              text: 'All-in',
              recent: false,
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SeatExamples;
