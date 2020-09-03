import React from 'react'
import { Card, CardContent, Typography, Grid} from '@material-ui/core' // imported to design and make the cards
import styles from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'

const Cards = (props) => {
    const {data} = props
    const {confirmed, recovered, deaths, lastUpdate} = data // destructuring
    if(!confirmed)
    {
        return 'Loading...'
    }
    return (
        <div className={styles.container}>
            <Grid container spacing = {3} justify="center"> {/* main card component that will contain the other three card components*/}
                
                {/* first card */}
                <Grid item component = {Card} xs={12} md={3} className={cx(styles.code, styles.infected)}> {/* xs = mobile (take all 12 spaces of the grid), md = PC and others (take 3 spaces) || cx is used to club two different classes together*/}
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography> {/* typography is more styled writing */}
                        <Typography variant="h5"> 
                            {/* the number counting animation is imolemented with CountUp */}
                            <CountUp 
                                start = {0} 
                                end = {confirmed.value}
                                duration = {1.5}
                                separator = ","
                            />{/* start = value from where to start, end = value to end, duration = total time taken to reach the number*/}
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> {/* creating a new Date() object and then call .toDateString on it to make it more readable format */}
                        <Typography variant="body2">Total Infected cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                {/* second card */}  
                <Grid item component = {Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp 
                                start = {0}
                                end = {recovered.value}
                                duration = {1.5}
                                separator = ","
                            />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of Recovries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                
                {/* Third card*/}
                <Grid item component = {Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp 
                                start = {0}
                                end = {deaths.value}
                                duration = {1.5}
                                separator = ","
                            />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number Deaths</Typography>
                    </CardContent>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Cards
