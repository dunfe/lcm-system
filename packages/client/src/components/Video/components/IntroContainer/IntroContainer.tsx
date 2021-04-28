import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import VideoLogo from './VideoLogo'
import { useAppState } from '../../state'
import UserMenu from './UserMenu/UserMenu'
import { useLocation } from 'react-router-dom'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

const useStyles = makeStyles((theme: Theme) => ({
    background: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        height: '100%',
    },
    container: {
        position: 'relative',
        flex: '1',
    },
    innerContainer: {
        display: 'flex',
        width: '888px',
        height: '379px',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px 0px rgba(40, 42, 43, 0.3)',
        overflow: 'hidden',
        position: 'relative',
        margin: 'auto',
        [theme.breakpoints.down('sm' as Breakpoint)]: {
            display: 'block',
            height: 'auto',
            width: 'calc(100% - 40px)',
            margin: 'auto',
            maxWidth: '400px',
        },
    },
    swooshContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff8e3c',
        backgroundSize: 'cover',
        width: '296px',
        [theme.breakpoints.down('sm' as Breakpoint)]: {
            width: '100%',
            height: '100px',
            backgroundPositionY: '140px',
        },
    },
    logoContainer: {
        position: 'absolute',
        width: '210px',
        textAlign: 'center',
        [theme.breakpoints.down('sm' as Breakpoint)]: {
            display: 'flex',
            alignItems: 'center',
            width: '90%',
            textAlign: 'initial',
            '& svg': {
                height: '64px',
            },
        },
    },
    twilioLogo: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '20px',
    },
    content: {
        background: 'white',
        width: '100%',
        padding: '4em',
        flex: 1,
        [theme.breakpoints.down('sm' as Breakpoint)]: {
            padding: '2em',
        },
    },
    title: {
        color: 'white',
        margin: '1em 0 0',
        [theme.breakpoints.down('sm' as Breakpoint)]: {
            margin: 0,
            fontSize: '1.1rem',
        },
    },
}))

interface IntroContainerProps {
    children: React.ReactNode
}

const IntroContainer = (props: IntroContainerProps) => {
    const classes = useStyles()
    const { user } = useAppState()
    const location = useLocation()

    return (
        <div className={classes.background}>
            {user && location.pathname !== '/login' && <UserMenu />}
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    <div className={classes.swooshContainer}>
                        <div className={classes.logoContainer}>
                            <VideoLogo />
                        </div>
                    </div>
                    <div className={classes.content}>{props.children}</div>
                </div>
            </div>
        </div>
    )
}

export default IntroContainer
