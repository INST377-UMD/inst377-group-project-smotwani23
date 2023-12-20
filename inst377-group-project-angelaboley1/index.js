const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const path = require('path');
const cors = require('cors');
const app = express()
const port = 3001;
app.use(cors());
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://cciehverwaskmygrcshp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaWVodmVyd2Fza215Z3Jjc2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0OTM1OTUsImV4cCI6MjAxNjA2OTU5NX0.NigHfaA_EQUbanQrCTYTkDKGEk4G-CfFWzj0Z4cg7Ys'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('about.html', { root: __dirname })
})

app.get('/reviews', async (req, res) => {
    console.log(`Getting Review`)

    const {data, error} = await supabase
        .from('Reviews')
        .select();

    if(error) {
        console.log(error)
    } else if(data) {
        res.send(data)
    }
})

app.post('/reviews', async (req, res) => {
    console.log('Adding Review')

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var comments = req.body.comments;

    const {data, error} = await supabase
        .from('Reviews')
        .insert([
            {'cust_first_name': firstName, 'cust_last_name': lastName, 'comments': comments}
        ])
        .select();

    console.log(data)
    console.log(error)
    res.header('Content-type', 'application/json')
    res.send(data)
})

app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE')
})