import * as React from 'react'

const InAppLogo = () => {
    return (
        <div style={{    paddingTop: 12,
            width: 200,
            height: 100,
            display: 'grid',
            placeItems: 'center'}}>
            <img
                alt={'in-app-logo'}
                width={200}
                height={60}
                src={
                    'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/No_target_line_hlhrqn.svg'
                }
            />
        </div>
    )
}

export default InAppLogo