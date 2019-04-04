let getAllStudents = ()=>{
        axios.get(`/student`)
        .then(function (response) {
            console.log(response.data.students);
            var students=response.data.students[0].registerno;
            $(".all").html('');
            var div3Content = '<tr><td>Name</td><td>Status</td></tr>';
            for(var i = 0; i < students.length; i++)
            {   
                div3Content += '<tr><td>' + students[i] + '</td><td>Present</td></tr>'; 
            }
            $(".all").append(div3Content);
        })
        .catch(function (error) {
        console.log(error);
        });
}
